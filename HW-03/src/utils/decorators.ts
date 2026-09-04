export function LogAdd(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
        console.log(`\n[LOG] Teendő hozzáadva:`, args[0]);
        return original.apply(this, args);
    };

    return descriptor;
}
