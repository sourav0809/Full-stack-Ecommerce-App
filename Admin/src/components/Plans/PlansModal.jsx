import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { RxCross2 } from "react-icons/rx";
import { useMediaQuery } from "@mui/material";
import { createTheme } from "@mui/material";
import React, { useState } from "react";
import AddPlans from "./AddPlans";

const PlansModal = ({ showModal }) => {
  const [selectedChannel, setSelectedChannel] = useState(0);
  const [selectedChannelPrice, setSelectedChannelPrice] = useState(0);

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1300,
        xl: 1536,
      },
    },
  });

  // screen breakpoints
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const moreThanlg = useMediaQuery(theme.breakpoints.up("lg"));

  // modal styles
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width:
      (isSmallScreen && "90%") ||
      (isMediumScreen && "70%") ||
      (isLargeScreen && "60%") ||
      (moreThanlg && "60%"),
    height: "80%",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
    scrollbarWidth: "thin",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  };

  return (
    <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className=" flex justify-end items-center sticky bg-white rounded-xl top-0">
          <div
            className=" primary-linear-bg px-2 py-2 cursor-pointer rounded-md staicky top-0"
            onClick={() => {
              showModal(false);
            }}
          >
            <RxCross2 className="text-2xl text-white " />
          </div>
        </div>

        <div className="px-4 py-2">
          <AddPlans
            setSelectedChannel={setSelectedChannel}
            setSelectedChannelPrice={setSelectedChannelPrice}
          />
        </div>

        <div className=" flex justify-between gap-2 items-center py-2 px-10 bg-white sticky bottom-0 w-full">
          <div className=" flex gap-2">
            <div className=" flex gap-2 justify-center items-center ">
              <h1>Selected Channels </h1>
              <h1>{selectedChannel}</h1>
            </div>
            <div className=" flex gap-2 justify-center items-cente ">
              <h1>Total Price</h1>
              <h1>{selectedChannelPrice}</h1>
            </div>
          </div>
          <div className=" flex gap-2">
            <button className=" bg-blue-500 text-white px-7 py-1.5 rounded-lg">
              Submit
            </button>
            <button
              className=" bg-red-600 text-white px-7 py-1.5 rounded-lg"
              onClick={() => {
                showModal(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default PlansModal;
