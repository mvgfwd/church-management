import Swal, { SweetAlertOptions } from 'sweetalert2';

// Confirmable is now a factory function, with an optional parameter object
export function Confirmable(options?: SweetAlertOptions) {
  // our factory function will return our actual decorator function, but now we have
  // an actual options object to configure our alert box :)
  return (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    // the usual, caching the original implementation
    const originalMethod = descriptor.value;
    // default values for our config, we’ll overwrite this with our options parameter
    const config: SweetAlertOptions = {
      title:
        options != undefined && options?.title
          ? options?.title
          : options != undefined && options?.title
          ? options?.title
          : 'Are you sure?',
      html:
        options != undefined && options?.html
          ? options?.html
          : 'Do you want to perform this action?',
      showDenyButton:
        options != undefined && options?.showDenyButton
          ? options?.showDenyButton
          : true,
      confirmButtonText:
        options != undefined && options?.confirmButtonText
          ? options?.confirmButtonText
          : 'Yes',
      denyButtonText:
        options != undefined && options?.denyButtonText
          ? options?.denyButtonText
          : 'No',
      icon: options != undefined && options?.icon ? options?.icon : undefined,
      buttonsStyling: false,
    };

    // from here it’s the same as before. We write the new implementation
    descriptor.value = async function (...args: any) {
      // ask for confirmation
      // //Config my html modal
      // if(args[0].name){
      //   config.html = 'Do you want to delete ' + args[0].name + ' ?'
      // }

      const res = await Swal.fire(config);
      if (res.isConfirmed) {
        // run original implementation if user confirms
        const result = originalMethod.apply(this, args);
        return result;
      }
    };
    return descriptor;
  };
}
