import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/core/components/ui/drawer';
import { useBreakpoint } from '@/core/hooks/use-breakpoint';

export function DialogOrDrawer({
  children,
  triggerSlot,
  titleSlot,
  descriptionSlot,
  footerSlot,
}: DialogOrDrawerProps) {
  const [open, setOpen] = useState(false);
  const { isDesktop } = useBreakpoint();

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{triggerSlot}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          {(titleSlot || descriptionSlot) && (
            <DialogHeader>
              {titleSlot && <DialogTitle>{titleSlot}</DialogTitle>}
              {descriptionSlot && (
                <DialogDescription>{descriptionSlot}</DialogDescription>
              )}
            </DialogHeader>
          )}
          {children}
          {footerSlot && <DialogFooter>{footerSlot}</DialogFooter>}
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{triggerSlot}</DrawerTrigger>
      <DrawerContent>
        {(titleSlot || descriptionSlot) && (
          <DrawerHeader>
            {titleSlot && <DrawerTitle>{titleSlot}</DrawerTitle>}
            {descriptionSlot && (
              <DrawerDescription>{descriptionSlot}</DrawerDescription>
            )}
          </DrawerHeader>
        )}
        {children}
        {footerSlot && <DrawerFooter>{footerSlot}</DrawerFooter>}
      </DrawerContent>
    </Drawer>
  );
}

export type DialogOrDrawerProps = {
  triggerSlot: React.ReactNode;
  titleSlot?: React.ReactNode;
  descriptionSlot?: React.ReactNode;
  footerSlot?: React.ReactNode;
  children: React.ReactNode;
};
