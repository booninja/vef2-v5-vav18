import { Index } from './Index';
import { useParams } from 'react-router-dom';

import s from './NewsPage.module.scss';

export function NewsPage() {
    const { id } = useParams();

    return (
        <section className={s.news}> 
            <Index id={id} allNews={true} />
        </section>
    )
}