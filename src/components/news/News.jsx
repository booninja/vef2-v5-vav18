import PropTypes from 'prop-types';

import React, { useEffect, useState } from 'react';
import s from './News.module.scss';

const apiUrl = process.env.REACT_APP_API_URL;

News.propTypes = {
  category: PropTypes.string,
  allNews: PropTypes.bool,
}

export function News({ category, allNews = false}) {
  console.log(category)
   // TODO sækja fréttir fyrir flokk
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [data, setData] = useState(false);
 
   useEffect(() => {
     async function fetchData() {
       setLoading(true);
       setError(null);
 
       let json;
 
       const main = apiUrl
       const type = category.id
       const url = main.concat(type)
       console.log('url', apiUrl )
       try { 
         const result = await fetch(url);

         if (!result.ok){
           throw new Error('Gögn ekki í lagi')
         }

         json = await result.json();
         console.log(json)
       } catch (e) {
         setError('Gat ekki sótt gögn.');
         return;
       } finally {
         console.log('setLoading False')
         setLoading(false);
       }

      setData(json);
       console.log(json)
     }
     fetchData();
   }, [category, allNews]);

   if (error) {
    return (
      <p>Villa kom upp: {error}</p>
    );
  }

  if (loading) {
    return (
      <p>Sæki gögn...</p>
    );
  }
  let news = data || [];
  if (news.length === 0){
    console.log('wtf')
    return( 
      <p>Villa kom upp! </p>
      )
    }
    console.log(news.items.slice(0, 5))
    console.log('hvað er category?', category)
  let articles = news.items 
  console.log(allNews)
  if(!allNews){
    articles = news.items.slice(0, 5)
  }
  console.log(articles)
 return(
  <div className={s.news__container}>
    <h2>{category.title}</h2>
    <ul className={s.news__list}> 
     {news.items.length === 0 && (
       <li>Engar fréttir</li>
     )}
     {articles.length > 0 && articles.map(({title, link}) => {
        return (
        <li className={s.news__item}><a href={link}>{title}</a></li>
          )
     })}
   </ul>
   <p>
        {!allNews ? <a href={category.id}>Allar fréttir</a> : <a href="/">Tilbaka</a> }
      </p> 
  </div>
 )
}
