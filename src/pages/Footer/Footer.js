import React from 'react'
import '../../css/footer.css'

function Footer() {
    return (
        <div>
            <div className="footerContainer">
            <img src="https://i.imgur.com/Fa68WOg.png" className="footerLogoIcon"/>
            <img src="https://i.imgur.com/fNqZsOX.png" className="socialIcons"/>
                <div className="footerContents">
                    
                    <div className="footerLogo">wantudy</div>
                    <div className="footerSlogan">
                        <p>한 페이지로 완성되는 스터디 매칭, 원터디.</p>
                    </div>
                    <div className="footerCompany">
                        <p>(주)삼시세끼</p>
                    </div>

                    <div className="footerBtns">
                        이용약관 | 개인정보처리방침 | 이용규칙 | 공지사항 | 문의하기
                    </div>

                    <div className="copyright">
                        ⓒ2021.삼시세끼.All rights reserved.
                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default Footer
