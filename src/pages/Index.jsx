import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { NewsList } from '../components/news-list/NewsList';

import s from './Index.module.scss';

const apiUrl = process.env.REACT_APP_API_URL;

Index.propTypes = {

  id: PropTypes.string,
  allNews: PropTypes.bool
}

export function Index({ id = undefined, allNews = false }) {
    // TODO útfæra yfirlitssíðu
  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(false);
  
    useEffect(() => {
      async function fetchData() {
        setLoading(true);
        setError(null);
  
        let json;
  
        const url = apiUrl
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
      }
      fetchData();
    }, [id, allNews]);
  
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
    console.log(news)
    if(id){
      news = news.filter((category) => {
        console.log('filter', category)
        return category.id === id
      });
    }
    return (
      <section className={s.index}>
        {news.length === 0 && (
          <div className={s.news__container}>
            <h2>Not Found</h2>
          </div>
        )}{news.length > 0 && news.map((news, i) => {
          return (
            <NewsList 
              key={i}
              category={news}
              allNews={allNews}
            />
          )
        })}
      
      </section>
    );
}

