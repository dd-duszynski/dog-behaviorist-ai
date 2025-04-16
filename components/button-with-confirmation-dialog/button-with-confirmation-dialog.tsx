import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type ButtonWithConfirmationDialogProps = {
  description?: string;
  onConfirm?: () => void;
};

export const ButtonWithConfirmationDialog = ({
  description,
  onConfirm,
}: ButtonWithConfirmationDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='destructive' className='w-full'>
          Remove profile
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter>
          <Button variant='destructive' onClick={onConfirm}>
            Confirm
          </Button>
          <DialogClose>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
