import { useForm } from "react-hook-form";
import axios from "axios";

const UserRegister = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const res = axios.post("http://localhost:5000/api/auth/register", data);

    console.log(res);
  };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <div className="form-control">
        <label>Name</label>
        <input
          type="text"
          name="name"
          {...register("name")}
          placeholder="Enter your name"
        />
      </div>

      <div className="form-control">
        <label>email</label>
        <input
          type="email"
          name="email"
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Email is not valid.",
            },
          })}
          placeholder="Enter your email"
        />
      </div>
      {errors.email && <span>This field is required.</span>}

      {/* include validation with required or other standard HTML validation rules */}
      <div className="form-control">
        <label>password</label>
        <input
          name="password"
          {...register("password", { required: true, minLength: 5 })}
          placeholder="Enter password"
        />
      </div>
      {/* errors will return when field validation fails  */}
      {errors.password && <span>Password must be atleast 5 characters.</span>}

      <button type="submit">Register</button>
    </form>
  );
};

export default UserRegister;
