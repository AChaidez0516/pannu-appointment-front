export const checkAptType = (aptType) => {
    switch(aptType){
        case "REGULAR":
            return "Regular appointment";
        case "PREFERRED":
            return "Preferred appointment"
        case "WAIT_LIST":
            return "First available appointment";
        case "URGENT":
            return "Urgent appointment";
        case "FOLLOWUP":
            "Follow up appointment";
        case "WALK_IN":
            return "Walk in appointment";
        default:
            break;
    }
}