import Modal from "./Modal";
import { format } from "date-fns";

function ReadMore({ message, children }) {
  return (
    <Modal>
      <Modal.ToggleOpen modalKey={message.id}>{children}</Modal.ToggleOpen>

      <Modal.Overlay modalKey={message.id}>
        <Modal.Wrapper>
          <div className="bg-gray-800 mx-auto my-5 overflow-auto rounded-lg shadow-lg w-11/12 md:w-3/5 lg:w-2/5 p-6 relative">
            <Modal.ToggleClose>
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-300">&times;</button>
            </Modal.ToggleClose>
            <h2 className="text-xl font-semibold text-white mb-4">Message Details</h2>
            <div className="space-y-4">
              <div className="text-sm text-gray-300">
                <span className="font-semibold">Date:</span>{" "}
                <span>
                  {format(message?.created_at, "dd LLL yyyy")} At {format(message?.created_at ?? new Date(), "HH:MM")}
                </span>
              </div>
              <div className="text-sm text-gray-300">
                <span className="font-semibold">Sender Name:</span> {message?.fullname}
              </div>
              <div className="text-sm text-gray-300">
                <span className="font-semibold">Email:</span> {message?.email}
              </div>
              <div className="text-sm text-gray-300">
                <span className="font-semibold">Phone Number:</span> {message?.phone}
              </div>
              <div className="text-sm text-gray-300">
                <span className="font-semibold">Message:</span> {message?.message}
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Modal.ToggleClose>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 focus:ring-4 focus:ring-blue-300">
                  Close
                </button>
              </Modal.ToggleClose>
            </div>
          </div>
        </Modal.Wrapper>
      </Modal.Overlay>
    </Modal>
  );
}

export default ReadMore;
