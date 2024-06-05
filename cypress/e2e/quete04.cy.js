describe("Envoyer une image", () => {
  beforeEach(() => {
    cy.visit("https://filebin.net/");
  });

  it("Upload file and download it in Zip format", () => {
    cy.get("#fileField").attachFile("../../photos/voiture.jpg");
    cy.wait(2000);
    cy.get(".lead").first().should("be.visible").and("contain.text","It contains 1 uploaded");
    cy.contains("Download files").click();
    cy.contains("Zip")
      .invoke("attr", "href")
      .then((downloadLink) => {
        const absulteLink = "https://filebin.net/" + downloadLink;
        cy.log(absulteLink);
        cy.downloadFile(
          absulteLink,
          "../photos",
          "voiture.zip"
        );
        cy.readFile("../photos/voiture.zip");
      });
  });

});