import React from "react"
import useModal from '@/hooks/useModal';
import { Button, Dialog, Slide, styled } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

const TableImage = styled('img')(() => ({
  width: 60,
  border: 0,
  borderRadius: 4,
}));

const Image = styled('img')(() => ({
  border: 0,
  borderRadius: 4,
}));


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default ({ src, alt }: { src: string, alt?: string }) => {

  const { modal, openModal, closeModal } = useModal();
  return (
    <>
      <Button onClick={openModal}>
        <TableImage src={`${window.origin}/${src}`} alt={alt} />
      </Button>
      <Dialog
        open={modal}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeModal}
        aria-describedby="alert-dialog-slide-description"
      >
        <Image src={`${window.origin}/${src}`} alt={alt} />
      </Dialog>
    </>
  )
}