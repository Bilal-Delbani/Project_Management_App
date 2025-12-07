import { createPortal } from "react-dom";
import { useRef, useImperativeHandle, forwardRef } from "react";

const ErrorDialog = forwardRef(function ErrorDialog({}, ref) {
  const dialogRef = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      },
      close() {
        dialogRef.current.close();
      },
    };
  });
  return createPortal(
    <dialog
      ref={dialogRef}
      className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
    >
      <h2 className="text-xl font-bold text-stone-700 my-4">
        Error! An Input is Empty...
      </h2>
      <p className="text-stone-600 mb-4">
        Please click the button below to return back!
      </p>
      <form method="dialog" className="mt-4 text-right">
        <button className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100">
          Return
        </button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
});
export default ErrorDialog;
