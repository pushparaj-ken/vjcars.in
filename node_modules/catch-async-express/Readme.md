# Async callback controllers


## Example

When the function you write you do not know how to catch the error.

```typescript
createUser = async (req: Request, res: Response) => {
    const user = await userService.createUser(req.body);
    res.status(httpStatus.CREATED).send(user);
  };
```

## Install

- with npm
```command
npm install catch-async-express 
```
- with yarn
```command
yarn add catch-async-express 
```

## Use
##### Help catch any error if it happens

```typescript
createUser = catchAsync(async (req: Request, res: Response) => {
    const user = await this.userService.createUser(req.body);
    res.status(httpStatus.CREATED).send(user);
  });
```

