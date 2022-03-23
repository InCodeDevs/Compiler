
# @incodelang/compiler

**Merged into [InCodeDevs/InCode](https://github.com/InCodeDevs/InCode)**

This is the official Compiler of the InCode Programming Language.
**Attention**: This is version 2 of the Compiler, if your are looking for the legacy documentation please visit https://github.com/InCodeDevs/Compiler/tree/v1.x/#readme


## Installation

Install @incodelang/compiler with npm

```bash
  npm install @incodelang/compiler
```

Install @incodelang/compiler with yarn

```bash
  yarn add @incodelang/compiler
```

## Usage/Examples

Compiling InCode-Code

```javascript
import { Compiler } from '@incodelang/compiler';

Compiler.compile("Create x as button");
```

Generating an Abstract-Syntax-Tree

```javascript
import { AbstractSyntaxTreeGenerator } from '@incodelang/compiler';

AbstractSyntaxTreeGenerator.generate("Create x as button");
```

Generating Code from Abstract-Syntax-Tree

```javascript
import { CodeGenerator, AbstractSyntaxTreeGenerator } from '@incodelang/compiler';

const ast = AbstractSyntaxTreeGenerator.generate("Create x as button");

CodeGenerator.generate(ast);
```

## Authors

- [Ben Siebert](https://github.com/MCTzOCK)
- [Lukas Birke](https://github.com/MisterMysticOfficial)


## License

[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)

