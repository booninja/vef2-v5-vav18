import { Index } from './Index';
import { News } from '../components/news/News'
import { useParams } from 'react-router-dom';

import s from './NewsPage.module.scss';

export function NewsPage() {
    const { id } = useParams();

    return (
        <section className={s.news}> 
            <News category={id} allNews={true} />
        </section>
    )
}