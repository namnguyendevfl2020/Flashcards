import Link from 'next/link';
import type { NextApiResponse  } from 'next'
import Image from 'next/image';

interface ErrorProps {
    statusCode: number;
    title: string;
}

interface InitialProps {
    title: string;
    res: NextApiResponse;
    err: any;
}

export default function Error({ statusCode, title }: ErrorProps) {
    return (
      <div className="error-container">
      {/* <Image */}
      <img src="https://rickandmortyapi.com/api/character/avatar/234.jpeg" alt="a dead morty..."/>
        {statusCode && <h1>Error: {title}</h1>}
        <p>We are sorry! There was an error</p>
        <Link href="/">
            <a>Go back home</a>
        </Link>
      </div>
    )
  }

Error.getInitialProps = (props: InitialProps) => {
    const { res, err } = props
    // const title = res ? res.message : err ? err.title: 404
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}
