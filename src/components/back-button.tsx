import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(-1);
      }}
      className="cursor-pointer self-start rounded-full border-[1px] border-slate-400 p-2 hover:bg-slate-400 md:hidden"
    >
      <FaArrowLeft />
    </div>
  );
};

export default BackButton;
