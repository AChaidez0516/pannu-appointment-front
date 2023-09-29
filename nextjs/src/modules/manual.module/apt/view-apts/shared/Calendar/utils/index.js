import moment from "moment";
import { APT_TYPE_TO_SEARCH } from "../../data";

export const getAptColor = (apt) => {
  if (apt.aptType === APT_TYPE_TO_SEARCH.PREFERRED) return "#0065FB";
  if (apt.aptType === APT_TYPE_TO_SEARCH.REGULAR) return "#FF0000";
  if (apt.aptType === APT_TYPE_TO_SEARCH.URGENT) return "#FF0000";
  if (apt.aptType === APT_TYPE_TO_SEARCH.WAIT_LIST) return "#FAC23C";
  if (moment(apt.aptDate).isBefore(moment(new Date()).format("YYYY-MM-DD")))
    return "#FF9100 !important";
};
