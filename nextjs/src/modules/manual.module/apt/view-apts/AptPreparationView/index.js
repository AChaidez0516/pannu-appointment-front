import Image from "next/image"
import { useState } from 'react'
import { ThreeDotIcon } from '../../../../../common/utils/Icons'
import { IMGS, ICONS } from '../../../../../common/utils/styleGuide'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css';
import SelectPopupModal from '../../../../../components/modals/SelectPopupModal'
import SetAlertModal from "../shared/SetAlertModal";
import {
  PreparationViewWrapper,
  AttachmentActionModal
} from "./styled";
import moment from 'moment'


export default function AptPreparationView({ apt, setApt, onClose }) {
  const [isOpenSetAlert, setIsOpenSetAlert] = useState(false);
  const [isOpenAttachmentAction, setIsOpenAttachmentAction] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState(null);
  const { provider, patient, testInfo, procedureInfo , location } = apt;

  const handleClickAttachmentAction = (attachment) => {
    setIsOpenAttachmentAction(true);
    setSelectedAttachment(attachment);
  }

  const handleViewAttachment = () => {
    window.open(selectedAttachment, '_blank');
  }

  const handleDownloadAttachment = () => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', selectedAttachment, true);
    xhr.responseType = 'blob';
    xhr.onload = function(e) {
      if (this.status == 200) {
        var myBlob = this.response;
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(myBlob);
        link.download = selectedAttachment.replace(/^.*[\\\/]/, '');
        link.click();
      }
    };
    xhr.send();
  }

  const handlePrintAttachment = () => {
    var printWinow = window.open(selectedAttachment, '_blank');
    printWinow.print();
  }

  return (
    <div className="section">
      <PreparationViewWrapper>
        <div className="header-desktop">Preparations and instructions</div>
        <div className="provider-info">
          <div className="avatar">
            <div className="top-ribbon">PPO</div>
            <Image
              src={IMGS.avatarDoctor1}
              width={40} height={40}
              layout={'responsive'}
              alt='provider-avatar'
            />
            {/* <div className="bottom-ribbon">PPO</div> */}
          </div>
          <div className="detail">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="name">{provider.fullName}</div>
              <div className="specialty">{provider.specialty}</div>
            </div>
            <div className="address">{location.address.split(',').slice(0, -1).join(',') }<br/>
            {location.address.split(',').slice(-1) }, United States</div>
            <div className="apt-date">
              <div className="month-day">
                <i>{moment(new Date(apt.aptDate)).format("dddd") }</i>  { moment(new Date(apt.aptDate)).format("MM/DD")}</div>
              <div className="time"><i>Start time</i> {moment(new Date(apt.aptDate + ' '+ apt.aptTime)).format("hh:mm A")}</div>
            </div>
          </div>
        </div>
        <div className="list">
          <div className="item">
            <div className="description">1. Call for an urgent appointment if you have any difficulties with breathing or are coughing more than usual.</div>
          </div>
          <div className="item">
            <div className="description">2. Begin preparation for endosopy.</div>
            <div className="apt-date">
              <div className="month-day"><i>Start date</i> &nbsp;12/12/20</div>
              <div className="time"><i>Start time</i> &nbsp;09:30&nbsp;&nbsp;PM</div>
              <div className="btn-set-alert" onClick={() => setIsOpenSetAlert(true)}>Set alert</div>
            </div>
          </div>
        </div>
        <div className="attachments">
          <div className="headline">Attachments</div>
          <div className="item">
            <div className="img-info">
              <div className="img">
                <Image
                  src={ICONS.pdf}
                  width={32} height={32}
                  layout={'responsive'}
                  alt='pdf-icon'
                />
              </div>
              <div className="filename">GERD 1.pdf</div>
            </div>
            <div className="btn-more" onClick={() => handleClickAttachmentAction('/assets/pdf/claim.pdf')}>
              <ThreeDotIcon width={4} height={18} color="#173FD4" />
            </div>
          </div>
          <div className="item">
            <div className="img-info">
              <div className="img">
                <Image
                  src={ICONS.pdf}
                  width={32} height={32}
                  layout={'responsive'}
                  alt='pdf-icon'
                />
              </div>
              <div className="filename">GERD emergencies.pdf</div>
            </div>
            <div className="btn-more" onClick={() => handleClickAttachmentAction('/assets/pdf/statement.pdf')}>
              <ThreeDotIcon width={4} height={18} color="#173FD4" />
            </div>
          </div>
        </div>
        <div className="btn-done" onClick={onClose}>Done</div>
        <SetAlertModal
          isOpened={isOpenSetAlert}
          setIsOpened={setIsOpenSetAlert}
          alerts={apt.alerts.prep}
          setAlerts={(v) => {setApt({...apt, alerts: { ...apt.alerts, prep: v }})}}
        />
        <SelectPopupModal
          onClose={() => setIsOpenAttachmentAction(false)}
          show={isOpenAttachmentAction}
          items={[]}
          isConformButton={false}
          handleCancel={() => setIsOpenAttachmentAction(false)}
          maxWidth={375}
        >
          <SimpleBar style={{ maxHeight: 400 }}>
            <AttachmentActionModal>
              <div className="btn-view" onClick={handleViewAttachment}>View</div>
              <div className="btn-download" onClick={handleDownloadAttachment}>Download</div>
              <div className="btn-print" onClick={handlePrintAttachment}>Print</div>
            </AttachmentActionModal>
          </SimpleBar>
        </SelectPopupModal>
      </PreparationViewWrapper>
    </div>
  )
}
