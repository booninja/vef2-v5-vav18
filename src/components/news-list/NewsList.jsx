import PropTypes from 'prop-types';

import { News } from '../news/News';

import s from './NewsList.module.scss';

NewsList.propTypes = {
  category: PropTypes.string,
  allNews: PropTypes.bool
}

export function NewsList({ category, allNews}) {

  return(// TODO sækja yfirlit fréttaflokka
    <div className={s.news}>
      <News category={category} allNews={allNews} />
    </div>
  )
}
