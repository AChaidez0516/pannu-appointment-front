import { AptCardWrapper } from "./styled";
import moment from "moment";

export default function AptCard({ apt, onClick }) {
  return (
    <AptCardWrapper>
      <div
        className="content"
        style={{
          borderStyle: "unset",
          width: "50%",
          margin: "auto",
          fontSize: "12px",
          textAlign: "center",
        }}
        onClick={onClick}
      >
        <div className="provider-info">
          <div className="right">
            <div className="time">
              {moment(new Date(apt.aptDate + " " + apt.aptTime)).format("h:mm")}
            </div>
          </div>
        </div>
      </div>
    </AptCardWrapper>
  );
}
