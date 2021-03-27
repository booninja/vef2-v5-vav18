import s from './Layout.module.scss';

export function Layout({ title, children }) {
    // TODO setja upp layout fyrir vef
    return ( <div className={s.layout}>
      <header className={s.layout__header}>
        <h1>{title}</h1>
      </header>
      <main className={s.layout__main}>
        {children}
      </main>
      <footer className={s.layout__footer}>
        <hr/>
        <p>Fréttir frá <a href="https://RUV.is">RÚV</a></p>
      </footer>
    </div> );
}
