import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectAllAlerts } from '../src/redux/reducers/alertSlice'

const AlertHandler = () => {
  const alerts = useSelector(selectAllAlerts)

  const checkAlertTimes = () => {
    let showAlert = false;
    let curTime = new Date("Y-m-d H:i:s").getTime();
    alerts.map(aptAlert => {
      if (!aptAlert) return;
      aptAlert.general.map(v => {
        let diff = curTime - new Date(v.datetime).getTime();
        if (diff > -60 && diff < 60) {
          showAlert = true;
        }
      })
      aptAlert.prep.map(v => {
        let diff = curTime - new Date(v.datetime).getTime();
        if (diff > -60 && diff < 60) {
          showAlert = true;
        }
      })
    })

    if (showAlert) {
      const options = {
        body: 'You successfully subscribed to our Notification service!',
        icon: 'src/images/icons/app-icon-96x96.png',
        image: 'src/images/main-image-sm.jpg',
        dir: 'ltr',
        lang: 'en-US', // BCP 47,
        vibrate: [100, 50, 200],
        badge: 'src/images/icons/app-icon-96x96.png',
        tag: 'confirm-notification',
        renotify: true,
        actions: [
            {
                action: 'confirm',
                title: 'Okay',
                icon: 'src/images/icons/app-icon-96x96.png'
            },
            {
                action: 'cancel',
                title: 'Cancel',
                icon: 'src/images/icons/app-icon-96x96.png'
            }
        ]
      };

      navigator.serviceWorker.ready
          .then(sw => sw.showNotification('Successfully subscribed (from SW)!', options));
    }
  }

  useEffect(() => {
    var intervalId = setInterval(checkAlertTimes, 60000);
    return () => clearInterval(intervalId);
  }, [alerts])

  return (
    <></>
  )
}

export default AlertHandler
