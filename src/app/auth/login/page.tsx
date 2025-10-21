import LoginForm from "@/UI/LoginForm";
import { Toaster } from "react-hot-toast";

export default function LoginPage() {
  return (
    <section className="flex justify-center items-center h-screen">
      <Toaster position="bottom-right" />
      <div className="flex w-[364px] flex-col gap-[45px]">
        <LoginForm />
      </div>
    </section>
  );
}
