import React from 'react'
const style = {
  width: "100%",
  height: "60px",
  marginTop: "5%",
  backgroundColor: "#f5f5f5"
}
const Footer = () => {
  return (
    <footer className="footer" style={style}>
      <p className="center" style={{paddingTop: "15px"}}>created by Damir Durmo</p>
    </footer>
  )
}

export default Footer;
