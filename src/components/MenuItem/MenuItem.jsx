function MenuItem({ linkClass, icon, textClass, text }) {
    return (
      <a className={linkClass}>
        {icon}
        <span className={textClass}>{text}</span>
      </a>
    );
  }

  export default MenuItem;