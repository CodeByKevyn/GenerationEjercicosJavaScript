const {
    estaAbierto,
    formatearPrecio,
    resumirPedido,
    calcularTotal,
    calcularDescuento,
    calcularTotalAPagar,
} = require("./negocio");

describe("estaAbierto", () => {
    test("a las 6 a. m. todavía está cerrado", () => {
        expect(estaAbierto(6)).toBe(false);
    });

    test("a las 7 a. m. ya está abierto", () => {
        expect(estaAbierto(7)).toBe(true);
    });

    test("a las 6 p. m. (hora 18) sigue abierto", () => {
        expect(estaAbierto(18)).toBe(true);
    });

    test("a las 7 p. m. (hora 19) ya cerró", () => {
        expect(estaAbierto(19)).toBe(false);
    });
});

describe("formatearPrecio", () => {
    test("8500 se muestra como $8.500", () => {
        expect(formatearPrecio(8500)).toBe("$8.500");
    });

    test("0 se muestra como $0", () => {
        expect(formatearPrecio(0)).toBe("$0");
    });
});

describe("resumirPedido", () => {
    test("guarda solo el id y la cantidad de cada línea", () => {
        const lineas = [{ producto: { id: 2, precio: 8500 }, cantidad: 2 }];

        expect(resumirPedido(lineas)).toEqual([{ id: 2, cantidad: 2 }]);
    });
});

describe("calcularTotal", () => {
    test("2 capuchinos y 1 pandebono suman $21.000", () => {
        const lineas = [
            { producto: { id: 2, precio: 8500 }, cantidad: 2 },
            { producto: { id: 4, precio: 4000 }, cantidad: 1 },
        ];

        const total = calcularTotal(lineas);

        expect(total).toBe(21000);
    });

    test("un pedido vacío suma $0", () => {
        expect(calcularTotal([])).toBe(0);
    });
});

describe("calcularDescuento", () => {
    test("un pedido de $21.000 no tiene descuento", () => {
        expect(calcularDescuento(21000)).toBe(0);
    });

    test("un pedido de $36.000 tiene $3.600 de descuento", () => {
        expect(calcularDescuento(36000)).toBe(3600);
    });

    test("un pedido de exactamente $30.000 también tiene descuento", () => {
        expect(calcularDescuento(30000)).toBe(3000);
    });

    test("un pedido de $29.500 no alcanza el descuento", () => {
        expect(calcularDescuento(29500)).toBe(0);
    });
});

describe("calcularTotalAPagar", () => {
    test("4 filtrados de Nariño ($36.000) pagan $32.400", () => {
        const lineas = [{ producto: { id: 3, precio: 9000 }, cantidad: 4 }];

        expect(calcularTotalAPagar(lineas)).toBe(32400);
    });

    test("2 capuchinos y 1 pandebono ($21.000) pagan $21.000", () => {
        const lineas = [
            { producto: { id: 2, precio: 8500 }, cantidad: 2 },
            { producto: { id: 4, precio: 4000 }, cantidad: 1 },
        ];

        expect(calcularTotalAPagar(lineas)).toBe(21000);
    });
});