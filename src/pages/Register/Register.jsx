import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

const Register = () => {
    const { createUser, updateUserProfile } = useAuth();

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const result = await createUser(data.email, data.password);

            await updateUserProfile(data.name, "");

            console.log(result.user);

            reset();
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            <h2>Register</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Name" {...register("name")} />

                <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                />

                <input
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                />

                <input type="text" placeholder="Phone" {...register("phone")} />

                <select {...register("role")}>
                    <option value="student">Student</option>

                    <option value="tutor">Tutor</option>
                </select>

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
