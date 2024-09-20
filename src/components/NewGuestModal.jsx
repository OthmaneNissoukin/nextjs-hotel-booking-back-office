import Modal from "./Modal";

function NewGuestModal() {
  return (
    <Modal>
      <Modal.ToggleOpen>
        <button
          type="button"
          className="w-full xs:w-auto text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Add New
        </button>
      </Modal.ToggleOpen>
      <Modal.Overlay>
        <Modal.Wrapper>
          <div className="w-full h-full flex items-center justify-center">
            <div className="p-5 bg-gray-900 w-[90%] max-w-[624px]">
              <h1 className="font-semibold text-2xl mb-7">New Guest</h1>
              <form action="">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="" className="font-semibold">
                      Fullname
                    </label>
                    <input type="text" className="py-2 px-4 dark:text-stone-900" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="" className="font-semibold">
                      National ID
                    </label>
                    <input type="text" className="py-2 px-4 dark:text-stone-900" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="" className="font-semibold">
                      Email
                    </label>
                    <input type="text" className="py-2 px-4 dark:text-stone-900" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="" className="font-semibold">
                      Phone
                    </label>
                    <input type="text" className="py-2 px-4 dark:text-stone-900" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-5">
                  <label htmlFor="" className="font-semibold">
                    Nationality
                  </label>
                  <input type="text" className="py-2 px-4 dark:text-stone-900" />
                </div>

                <div className="mt-5 flex gap-5 justify-end">
                  <Modal.ToggleClose>
                    <button type="button" className="px-6 py-2 bg-red-800 text-stone-100">
                      Cancel
                    </button>
                  </Modal.ToggleClose>
                  <button className="px-8 py-2 bg-blue-700 text-stone-100">Save</button>
                </div>
              </form>
            </div>
          </div>
        </Modal.Wrapper>
      </Modal.Overlay>
    </Modal>
  );
}

export default NewGuestModal;
