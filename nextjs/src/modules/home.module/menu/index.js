import {
  MenuWrapper
} from './styled'
import { ArrowIcon } from '../../../common/utils/Icons'

const Menu = () => {
  const menus = [
    { title: 'Member ID & QR code', link: '', hasArrowIcon: false },
    { title: 'Member  profile - edit & update', link: '', hasArrowIcon: true },
    { title: 'Set up biometric verification', link: '', hasArrowIcon: false },
    { title: 'Subscriptions and purchases ', link: '', hasArrowIcon: true },
    { title: 'Contacts', link: '', hasArrowIcon: false },
    { title: 'Pending payments', link: '', hasArrowIcon: false },
    { title: 'Prescriptions', link: '', hasArrowIcon: false },
    { title: 'Labs and diagnostics ', link: '', hasArrowIcon: false },
    { title: 'Special offers', link: '', hasArrowIcon: false },
    { title: 'Communication app', link: '', hasArrowIcon: false },
    { title: 'Appointments', link: '', hasArrowIcon: true },
    { title: 'POEM', link: '', hasArrowIcon: true },
    { title: 'Ratings and Surveys', link: '', hasArrowIcon: false },
    { title: 'My providers & doctors', link: '', hasArrowIcon: false },
    { title: 'Provider search', link: '', hasArrowIcon: false },
    { title: 'Saved searches', link: '', hasArrowIcon: false },
    { title: 'Favorites', link: '', hasArrowIcon: false },
    { title: 'Payment methods', link: '', hasArrowIcon: false },
    { title: 'Help & FAQ', link: '', hasArrowIcon: false },
    { title: 'Help me find', link: '', hasArrowIcon: false },
    { title: 'Referrals', link: '', hasArrowIcon: false },
    { title: 'Change username', link: '', hasArrowIcon: false },
    { title: 'Dispute', link: '', hasArrowIcon: false },
    { title: 'Ideas & suggestions', link: '', hasArrowIcon: false },
    { title: 'Contact us', link: '', hasArrowIcon: false },
    { title: 'Privacy', link: '', hasArrowIcon: false },
    { title: 'Terms of service', link: '', hasArrowIcon: false },
    { title: 'Cancel service', link: '', hasArrowIcon: false },
  ]
  return (
    <MenuWrapper>
      <div className="container">
        { menus.map((v, idx) => (
          <div key={idx} className="one">
            <span className="text">{v.title}</span>
            { (v.hasArrowIcon&& <span className="icon"><ArrowIcon /></span>) }
          </div>
        )) }
      </div>
      <div className="bottom">
        <button className="btn" onClick={() => console.log('log out')}>Log out</button>
        <a rel="noopener noreferrer" className="link">Pending payments</a>
      </div>
    </MenuWrapper>
  )
}

export default Menu