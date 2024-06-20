import Lottie from "lottie-react";
import success from "../images/success.json";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <Lottie className="w-96 h-96" animationData={success} loop={false} />
        <div className="flex flex-col space-y-3 items-center justify-center">
          <h1 className="text-black">Purchase Success!</h1>
          <h3 className="text-black font-semibold">
            Thank you for trusting us! We won't let you down!
          </h3>
          <button
            onClick={() => {
              navigate("/dashboard");
            }}
            className="btn bg-harvest_gold hover:bg-harvest_gold-200"
          >
            <p className="text-black font-bold">Back to Home</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
