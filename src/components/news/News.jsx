import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {  Link } from 'react-router-dom';

import { NotFound } from '../../pages/NotFound'
import s from './News.module.scss';

const apiUrl = process.env.REACT_APP_API_URL;

News.propTypes = {
  category: PropTypes.string,
  allNews: PropTypes.bool,
}

export function News({ category, allNews = false}) {
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
       const type = category.id || category
       const url = main.concat(type)
       try { 
         const result = await fetch(url);

         if (result.status === 404){   
          throw new Error(404)
        }

         if (!result.ok){
           throw new Error('Gat ekki sótt gögn.')
         }
        
         json = await result.json();

       } catch (e) {
         setError(e.message);    
         return;
       } finally {
         setLoading(false);
       }

      setData(json);
     }
     fetchData();
   }, [category, allNews]);

   if(error === '404'){
    return (
       <NotFound/>
     );
   }

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
    return( 
      <p>Villa kom upp! </p>
      )
    }

  let articles = news.items 
  if(!allNews){
    articles = news.items.slice(0, 5)
  }

 return(
  <div className={s.news__container}>
    <h2>{news.title}</h2>
    <ul className={s.news__list}> 
     {news.items.length === 0 && (
       <li>Engar fréttir</li>
     )}
     {articles.length > 0 && articles.map(({title, link}, i) => {
        return (
          
        <li key={i} className={s.news__item}><Link key={i} to={link}>{title}</Link></li>
          )
     })}
   </ul>
   <p>
        {!allNews ? <Link to={category}>Allar fréttir</Link> : <Link to="/">Tilbaka</Link> }
      </p> 
  </div>
 )
}
