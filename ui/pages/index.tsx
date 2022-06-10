import type { NextPage } from 'next'
import userSwr from 'swr'
import styles from '../styles/Home.module.css'
import fetcher from '../utils/fetcher';
interface User {
    _id:string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    session : string;
    iat : number;
    exp:number;
}
const Home: NextPage = () => {
    const {data} = userSwr<User>(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,fetcher);
    if(data) {
        return <div>Welcome ! {data.name}</div>
    }
    return (
        <div className={styles.container}>
            Please login
        </div>
    )
}

export async function getServerSideProps() {
    const data = fetcher(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`)
}

export default Home
