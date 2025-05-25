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
import { strings } from '@/lib/strings/pl';

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
          {strings.dogs.remove_profile}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{strings.general.are_you_sure}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter>
          <Button variant='destructive' onClick={onConfirm}>
            {strings.general.confirm}
          </Button>
          <DialogClose>
            <Button variant='outline'>{strings.general.cancel}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
