/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from 'next'
// import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'

import styles from './home.module.scss'

interface HomeProps {
  product : {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }:HomeProps) {

  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get acess to all the publications <br /> 
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding"/>
      </main>
    </>
  )
}

// 3 formas de conteúdo:
// Client Side - Quando não precisa necessáriamente fazer parte da indexação.
// Server Side - Melhor indexação com dados voltados para o usúario.
// Static Site Generation - Melhor indexação.

//Post do Blog : 
// Conteúdo do post (SSG)
// Comentários (Client Side) 


// export const getServerSideProps: GetServerSideProps = async () => {
//Tudo que é retornado do GetServerSideProps é mostrado na props da Home
//Renderizado no nodejs
//Server Side Rendering
//Melhor para conteúdos específicos para o usúario. Dados dinamicos. 

//////////////////////////////////////


//GetStaticProps deixa de forma estática, e o revalidate é o tempo que quer para revalidar o conteudo da pagina
//Bom para valores que não vão mudar tão cedo.

  export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1JFmZ5KdGvDLOCxsET6aNIn5')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };

  return {
    props: {  
      product
    },
    revalidate: 60 * 60 * 24, // 24 horas
  }
}