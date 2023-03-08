
export const REMOVE_MULTIPLE_WARNING = (quantity: number): string[] => {
    return [
        `You are about to remove ${quantity} ${quantity > 1 ? 'items' : 'item'}.`,
        `This action can't be undone, confirm to continue.`,
    ];
}

export const REMOVE_MULTIPLE_FEEDBACK = (quantity: number): string => {
    return `Deleted ${quantity} ${quantity > 1 ? 'items' : 'item'}`;
}

export const REMOVE_ALL_FEEDBACK = (quantity: number): string => {
    return `Deleted ${quantity} ${quantity > 1 ? 'items' : 'item'} (dashboard cleared)`;
}