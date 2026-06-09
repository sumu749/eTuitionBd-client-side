import useRole from "./useRole";

const useStudent = () => {
    const { isStudent, loading } = useRole();
    return [isStudent, loading];
};

export default useStudent;
