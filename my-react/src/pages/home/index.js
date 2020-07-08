import React from 'react'
import style from './style.less'
import jpg from 'assets/a.jpg'

class Home extends React.PureComponent {
  render() {
    return (
      <div className={style.nameDiv}>
        this is home
        {/* <img src="https://www.baidu.com/img/flexible/logo/pc/result.png"/> */}
        <img src={jpg} style={{width: 50+'px'}}/>
      </div>
    )
  }
}

export default Home
