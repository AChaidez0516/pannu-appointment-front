import Popover from "@mui/material/Popover";

const CustomPopover = ({ children, open, onClose, anchorEl }) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      style={{ marginTop: 10 }}
    >
      {children}
    </Popover>
  )
}

export default CustomPopover