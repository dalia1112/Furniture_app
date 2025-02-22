import styles from './buttonlayout.module.css'

const ButtonLayout = ({placeholder}) => {
  return (
    <button className={`${styles.custombtn} my-4`}>
            {placeholder}
    </button>
  )
}

export default ButtonLayout