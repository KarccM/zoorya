import { Switch } from "@mui/material";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useClient } from "@/context/auth-context";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

function SwitchAction({ value, original, name }) {
    const [checked, setChecked] = useState(value);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const client = useClient('multipart/form-data');
    const queryClient = useQueryClient();

    const handleConfirmation = () => {
        setOpenConfirmation(!openConfirmation);
    };

    const { mutate, isLoading } = useMutation(
        (data) =>
            client(`users/${original.id}`, {
                method: 'POST',
                data: data,
            }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('users');
                setChecked(!checked);
                handleConfirmation();
            },
        }
    );
    const bulkAction = () => {
        mutate({
            [name]: !original[name],
        });
        handleConfirmation();
    };

    return (
        <>
            <Switch checked={checked} onChange={handleConfirmation} />
            {openConfirmation && (
                <ConfirmationModal
                    isLoading={isLoading}
                    onSave={bulkAction}
                    closeConfirmation={handleConfirmation}
                    confirmation={openConfirmation}
                />
            )}
        </>
    );
}

export default SwitchAction;
