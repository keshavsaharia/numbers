import { S3Client, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront'

import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import glob from 'fast-glob'
import mime from 'mime-types'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

// File and directory references
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const __source = path.join(__dirname, '..')
const __output = path.join(__dirname, '../build')

// S3 client for writing files
const s3 = new S3Client({ region: 'us-east-1' })
const cloudfront = new CloudFrontClient()
const BUCKET = process.env.BUCKET                 // 'dev.ts.coach'   // || 'ts.coach'
const DISTRIBUTION = process.env.DISTRIBUTION     // 'E272FIJZ7O4S4G' // || 'E1L1MN9XWMK3UH'
const DOMAIN = 'https://' + (process.env.DOMAIN || BUCKET)  // 'dev.ts.coach' || 'ts.coach'

if (! BUCKET || ! DISTRIBUTION || ! DOMAIN)
    throw new Error('Environment variables BUCKET, DISTRIBUTION, and DOMAIN not set')

async function run() {
    build()
    .then(() => generateSitemap())
    .then(() => generateRobots())
    .then(() => deploy())
    .then(() => clearCache())
}

/**
 * 1. Run NextJS build
 */
async function build() {
    console.log('Compiling Next.JS build')
    const result = execSync('npm run build', { 
        cwd: __source,
        env: {
            ...process.env,
            NEXT_PUBLIC_BASE_URL: 'https://' + BUCKET
        },
        stdio: 'ignore'
    })
    console.log('Done compiling')
}

async function generateRobots() {
    const robots = []
    robots.push(
        'User-Agent: *',
        'Allow: /',
        '',
        `Sitemap: ${ DOMAIN }/sitemap.xml`
    )

    fs.writeFileSync(path.join(__output, 'robots.txt'), robots.join('\n'), 'utf8')
}

const SITEMAP_IGNORE = new Set(['404', '404.html'])
async function generateSitemap() {
    const output = [
        '<?xml version="1.0" encoding="UTF-8"?>\n',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    ]
    const pages = await glob(`${ __output }/**/*.html`, { nodir: true })

    for (let page of pages) {
        const pagePath = path.relative(__output, page).replace(/\/?index\.html$/g, '')
        if (SITEMAP_IGNORE.has(pagePath)) continue

        let lastMod = '' 
        try {
            lastMod = execSync('git log -1 --pretty="format:%cs" ' + path.join(__source, 'app', pagePath, 'page.mdx')).toString()
        } catch (e) {}
        if (lastMod == '') {
            console.log('no date', pagePath)
            continue
        }

        // Favor results that are more specific (i.e. nested more deeply)
        const priority = (pagePath == '') ? 1 : (0.5 + pagePath.split('/').length * 0.1)

        output.push('<url>',
                `<loc>${ DOMAIN }/${ pagePath }</loc>`,
                `<lastmod>${ lastMod }</lastmod>`,
                '<changefreq>weekly</changefreq>',
                '<priority>', priority.toFixed(1), '</priority>',
            '</url>'
        )
        // console.log('path: ' + pagePath, lastMod)
    }

    output.push('</urlset>')
    fs.writeFileSync(path.join(__output, 'sitemap.xml'), output.join(''), 'utf8')
}

/**
 * 2. Deploy all files from output directory
 */
async function deploy() {
    const files = await glob(`${ __output }/**/*`, { nodir: true })
    let totalLength = 0

    console.log(`Deploying ${ files.length } files`)
    for (const file of files) {
        const body = fs.readFileSync(file)
        totalLength += body.length
        
        // console.log('put ', file, path.relative(__output, file))
        const key = path.relative(__output, file)
        // console.log(`[ writing ] ${ key }`)
        await s3.send(new PutObjectCommand({
            Bucket: BUCKET,
            Key: key,
            Body: fs.readFileSync(file),
            ContentType: mime.lookup(file) || 'application/octet-stream'
        }))
        // console.log(result)
    }
    console.log('Done deploying: ' + totalLength)
}

/**
 * 3. Create a CloudFront invalidation
 */
async function clearCache() {
    console.log('Clearing CF cache')
    const result = await cloudfront.send(new CreateInvalidationCommand({
        DistributionId: DISTRIBUTION,
        InvalidationBatch: {
            CallerReference: crypto.randomUUID(),
            Paths: {
                Quantity: 1,
                Items: [
                    '/*'
                ]
            }
        }
    }))

    if (result.Invalidation) {
        console.log(`CloudFront invalidation for ${ DISTRIBUTION }`)
    }
}

run()
