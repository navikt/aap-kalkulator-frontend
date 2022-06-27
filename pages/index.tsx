import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useQuery} from "@apollo/client";
import {Sporsmal} from "../lib/schema/graphql";
import {GET_QUESTIONS} from "../lib/queries/questions/getQuestions";

const Home: NextPage = () => {
  const {data, loading, error} = useQuery<Sporsmal>(GET_QUESTIONS)
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error {JSON.stringify(error)}</div>
  }
  return (
    <div className={styles.container}>
      {JSON.stringify(data)}
    </div>
  )
}

export default Home
