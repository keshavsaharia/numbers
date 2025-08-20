import { SectionGroup } from '@/components/types'

export default {
  title: 'Databases',
  description: 'Databases are really just structured collections of numbers. Every piece of data - whether it\'s a username, a timestamp, a decimal price, or a binary blob - is ultimately represented in numerical form. Even complex data structures like JSON documents or spatial coordinates resolve down to a series of numeric encodings.',
  base: '/database',
  sections: [
    {
      title: 'Postgres',
      description: 'Postgres is an open-source, high-performance OLTP database system.',
      link: '/database/postgres',
      path: 'postgres'
    },
    {
      title: 'ClickHouse',
      description: 'ClickHouse is an open-source, high-performance OLAP database system.',
      link: '/database/clickhouse',
      path: 'clickhouse'
    },
    {
      title: 'Redis',
      description: 'Redis is an open-source, high-performance distributed key-value store.',
      link: '/database/redis',
      path: 'redis'
    },
    {
      title: 'Sqlite',
      description: 'Sqlite is an open-source, high-performance embedded database system.',
      link: '/database/sqlite',
      path: 'sqlite'
    },
    {
      title: 'MongoDB',
      description: 'MongoDB is an open-source, high-performance distributed document-oriented database system.',
      link: '/database/mongodb',
      path: 'mongodb'
    }
  ]
} satisfies SectionGroup