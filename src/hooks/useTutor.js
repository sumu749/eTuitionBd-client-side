import useRole from "./useRole";

const useTutor = () => {
    const { isTutor, loading } = useRole();
    return [isTutor, loading];
};

export default useTutor;
