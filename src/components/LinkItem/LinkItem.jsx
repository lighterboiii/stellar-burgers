import PropTypes from 'prop-types'

function LinkItem({ linkClass, icon, textClass, text, href }) {

  return (
    <a className={linkClass} href={href}>
      {icon} <span className={textClass}>{text}</span>
    </a>
  );
}

LinkItem.propTypes = {
  linkClass: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  textClass: PropTypes.string.isRequired
}

export default LinkItem;