export function LogAction(label: string) {
    return function (
        target: Object,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const original = descriptor.value;

        descriptor.value = function (...args: any[]) {
            console.log(`\n[LOG] ${label}:`, ...args);
            return original.apply(this, args);
        };

        return descriptor;
    };
}
