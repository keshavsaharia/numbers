export function getUrl(base?: string, link?: string, path?: string): string {
    if (link)
        return link
    else if (path)
        return [base, path].join('/')
    return base || '/'
}