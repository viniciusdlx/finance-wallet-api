type Error = {
    message: string;
    code: string;
    details?: string | undefined;
};

export type ErrorMessageCode = Error | Error[];
