Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: jest.fn().mockImplementation(query => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(), // Mock addListener
		removeListener: jest.fn(), // Mock removeListener
		addEventListener: jest.fn(), // Mock addEventListener
		removeEventListener: jest.fn(), // Mock removeEventListener
		dispatchEvent: jest.fn(),
	})),
});

