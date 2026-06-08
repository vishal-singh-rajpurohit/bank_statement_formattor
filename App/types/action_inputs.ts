import { z } from "zod";

export const supportedBanks = ["AU", "KOTAK"] as const;

export const actionDetailsSchema = z.object({
    bank_name: z
        .string()
        .min(1, "Select a supported bank")
        .refine((value) => supportedBanks.includes(value as (typeof supportedBanks)[number]), "Select a supported bank"),
    tally_name: z.string().trim().min(2, "Tally company name is required"),
    voucher_name: z.string().trim().min(2, "Ledger/output name is required"),
    password: z.string().optional(),
});

export type ActionDetailsFormValues = z.infer<typeof actionDetailsSchema>;
export type ActionDetailsFormErrors = Partial<Record<keyof ActionDetailsFormValues, string>>;
